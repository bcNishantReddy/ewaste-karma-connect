
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    // Create a Supabase client with the Admin key
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Get the authorization header from the request
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) {
      throw new Error('Missing Authorization header')
    }

    // Get the current user from the token
    const token = authHeader.replace('Bearer ', '')
    const {
      data: { user },
      error: userError,
    } = await supabaseAdmin.auth.getUser(token)

    if (userError) throw userError

    // Check if the current user is an admin
    const { data: profile, error: profileError } = await supabaseAdmin
      .from('profiles')
      .select('user_type')
      .eq('id', user.id)
      .single()

    if (profileError) throw profileError
    if (profile.user_type !== 'admin') {
      throw new Error('Unauthorized: Admin access required')
    }

    // Parse the request body
    const { action, payload } = await req.json()

    // Execute the requested admin action
    let result
    
    switch (action) {
      case 'create_admin':
        // Create a new user with admin role
        const { email, password, name } = payload
        
        const { data: newUser, error: createError } = await supabaseAdmin.auth.admin.createUser({
          email,
          password,
          email_confirm: true,
          user_metadata: {
            name,
            userType: 'admin'
          }
        })
        
        if (createError) throw createError
        result = { success: true, user: newUser }
        break
        
      case 'update_user_type':
        // Update a user's type (e.g., promote to admin or change role)
        const { userId, userType } = payload
        
        // Update the profile
        const { data: updatedProfile, error: updateError } = await supabaseAdmin
          .from('profiles')
          .update({ user_type: userType })
          .eq('id', userId)
          .select()
          .single()
          
        if (updateError) throw updateError
        result = { success: true, profile: updatedProfile }
        break
        
      case 'get_admin_stats':
        // Get overall system statistics
        const [
          { count: usersCount },
          { count: pickupsCount },
          { data: userTypes },
          { data: karmaData },
        ] = await Promise.all([
          supabaseAdmin.from('profiles').select('*', { count: 'exact', head: true }),
          supabaseAdmin.from('pickups').select('*', { count: 'exact', head: true }),
          supabaseAdmin.from('profiles').select('user_type, count').group('user_type'),
          supabaseAdmin.from('profiles').select('karma_points')
        ])
        
        const totalKarma = karmaData?.reduce((sum, user) => sum + (user.karma_points || 0), 0) || 0
        
        result = { 
          success: true, 
          stats: {
            totalUsers: usersCount,
            totalPickups: pickupsCount,
            userTypes,
            totalKarma
          }
        }
        break
        
      default:
        throw new Error(`Unknown admin action: ${action}`)
    }

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error) {
    console.error('Admin function error:', error.message)
    
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})

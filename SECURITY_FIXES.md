# Supabase Security Fixes Documentation

## Overview
This document explains the security fixes applied to resolve Supabase database linter warnings and improve overall database security.

## Issues Fixed

### 1. RLS Disabled in Public Tables
**Problem**: Several tables in the public schema had Row Level Security (RLS) disabled, creating security vulnerabilities.

**Tables Fixed**:
- `public.media_files`
- `public.users` 
- `public.admins`
- `public.admin_sessions`

**Solution**: Enabled RLS on all public tables and created appropriate security policies.

### 2. Function Search Path Mutable
**Problem**: Database functions had mutable search paths, which could lead to security vulnerabilities through function injection attacks.

**Functions Fixed**:
- `public.trigger_set_timestamp`
- `public.handle_new_user`
- `public.is_admin`
- `public.update_updated_at_column`

**Solution**: Added `SECURITY DEFINER SET search_path = public, pg_temp` to all functions to lock down the search path.

### 3. Permissive RLS Policies
**Problem**: Several RLS policies were overly permissive, using `USING (true)` or `WITH CHECK (true)` which effectively bypassed security.

**Tables with Tightened Policies**:
- `public.contact_submissions`
- `public.contact_subscriptions`
- `public.media`

**Solution**: Replaced permissive policies with more restrictive ones that include validation checks.

## Implementation

### Migration File
The fixes are implemented in `supabase/migrations/005_security_fixes.sql` which:
1. Enables RLS on all public tables
2. Secures function search paths
3. Creates appropriate RLS policies
4. Tightens overly permissive policies
5. Adds timestamp triggers where needed

### Application Script
The `scripts/apply-security-fixes.cjs` script:
1. Loads the migration file
2. Executes it against your Supabase database
3. Verifies that fixes were applied correctly
4. Provides detailed feedback on the process

## Security Improvements

### Before Fixes
- ❌ RLS disabled on public tables
- ❌ Mutable function search paths
- ❌ Overly permissive INSERT/UPDATE policies
- ❌ No validation on data insertion

### After Fixes
- ✅ RLS enabled on all public tables
- ✅ Secure function search paths
- ✅ Restrictive policies with validation
- ✅ Proper access controls for admin functions
- ✅ Data validation on insert operations

## RLS Policies Created

### Admin Tables
- **admins**: Only admins and service role can read/update records
- **admin_sessions**: Only admins and service role can manage sessions

### Contact Tables
- **contact_subscriptions**: Insert with email and name validation
- **contact_submissions**: Insert with email format and message length validation

### Media Table
- **media**: Authenticated users can insert, only admins can delete

## How to Apply Fixes

### Method 1: Using the Script (Recommended)
```bash
cd scripts
node apply-security-fixes.cjs
```

### Method 2: Manual via Supabase Dashboard
1. Copy the contents of `supabase/migrations/005_security_fixes.sql`
2. Paste into Supabase SQL Editor
3. Execute the query

### Method 3: Via Supabase CLI
```bash
supabase migration up
```

## Verification

After applying the fixes, you can verify them by:

1. **Checking Supabase Dashboard**: The security warnings should disappear
2. **Running the verification script**: The apply script includes automatic verification
3. **Manual testing**: 
   - Try to access protected tables without authentication
   - Test that admin functions still work
   - Verify contact forms still accept submissions

## Testing Recommendations

### Admin Functionality
- ✅ Login as admin
- ✅ Access admin dashboard
- ✅ Manage content
- ✅ View user profiles

### Public Access
- ✅ Browse public content
- ✅ Submit contact forms
- ✅ Subscribe to newsletter
- ❌ Access admin-only tables (should be denied)

### Security Validation
- ❌ Anonymous access to admin tables (should fail)
- ❌ Non-admin access to admin functions (should fail)
- ❌ Invalid data in contact forms (should be rejected)

## Troubleshooting

### Common Issues

1. **"Missing Supabase credentials"**
   - Ensure `.env.local` contains `VITE_SUPABASE_URL` and `SUPABASE_SERVICE_KEY`

2. **"Permission denied" errors**
   - Make sure you're using the service role key, not the anon/public key

3. **"Table does not exist" warnings**
   - These are normal if some tables haven't been created yet

4. **Application functionality broken**
   - Check that your application is using proper authentication
   - Verify that RLS policies match your application's access patterns

### Rollback Procedure
If issues occur, you can rollback by:
1. Creating a new migration that reverses the changes
2. Or manually dropping the policies and disabling RLS on affected tables

## Additional Security Recommendations

1. **Regular Security Audits**: Run the Supabase database linter periodically
2. **Monitor Access Logs**: Keep track of database access patterns
3. **Update Policies**: Review and update RLS policies as your application evolves
4. **Use Service Role Sparingly**: Only use service role when absolutely necessary
5. **Implement Rate Limiting**: Add application-level rate limiting for API endpoints

## Future Maintenance

- Review RLS policies quarterly
- Update security configurations as new features are added
- Monitor for new Supabase security best practices
- Keep function search paths locked down
- Regularly audit permissive policies

## Support

If you encounter issues with these security fixes:
1. Check the Supabase documentation
2. Review the migration script output
3. Verify your environment configuration
4. Test with a staging database first

The fixes implemented follow Supabase security best practices and should resolve all the warnings you encountered.
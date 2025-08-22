/**
 * Detects available environments by scanning environment variables for common patterns.
 * 
 * This function looks for environment variables that follow the pattern:
 * {ENVIRONMENT}_SERVER_IP, {ENVIRONMENT}_SERVER_ADDRESS, etc.
 * 
 * @returns An array of detected environment names in lowercase
 */
export function detectEnvironments(): string[] {
	const environmentPrefixes = new Set<string>();
	
	// Common environment variable suffixes that indicate an environment configuration
	const environmentSuffixes = [
		'_SERVER_IP',
		'_SERVER_ADDRESS', 
		'_SERVER_USERNAME',
		'_SITE_DIRECTORY',
		'_DATABASE_NAME',
		'_DATABASE_USERNAME',
		'_DATABASE_PASSWORD'
	];
	
	// Scan all environment variables
	for (const [key, value] of Object.entries(Deno.env.toObject())) {
		// Skip empty values
		if (!value || value.trim() === '') {
			continue;
		}
		
		// Check if this environment variable matches any of our expected patterns
		for (const suffix of environmentSuffixes) {
			if (key.endsWith(suffix)) {
				// Extract the environment prefix (everything before the suffix)
				const prefix = key.slice(0, -suffix.length);
				if (prefix) {
					environmentPrefixes.add(prefix.toLowerCase());
				}
				break;
			}
		}
	}
	
	// Convert to array and sort for consistent ordering
	const environments = Array.from(environmentPrefixes).sort();
	
	// Always include 'dev' as a local environment if not already present
	if (!environments.includes('dev')) {
		environments.unshift('dev');
	}
	
	return environments;
}

/**
 * Detects remote environments (excludes 'dev' which is local-only)
 * 
 * @returns An array of detected remote environment names
 */
export function detectRemoteEnvironments(): string[] {
	return detectEnvironments().filter(env => env !== 'dev');
}

/**
 * Detects local environments (currently just 'dev')
 * 
 * @returns An array of local environment names
 */
export function detectLocalEnvironments(): string[] {
	return detectEnvironments().filter(env => env === 'dev');
}
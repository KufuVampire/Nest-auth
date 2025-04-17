export function parseBoolean(value: string): boolean {
	return value.trim().toLowerCase() === 'true' ? true : false;
}
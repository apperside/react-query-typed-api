/**
 * This has been taken from here
 * https://gist.github.com/hyamamoto/fd435505d29ebfa3d9716fd2be8d42f0
 * 
 * it seem to performant, but some effort should be made to 
 * check if there is a better way to do this.
 * 
 * Maybe this?
 * https://github.com/satazor/js-spark-md5
 * 
 */
function hashCode(s?: string): string {
	if (!s) return "";
	let h = 0;
	for (let i = 0;i < s.length;i++)
		h = Math.imul(31, h) + s.charCodeAt(i) | 0;
	return String(h);
}

export const utils = {
	hashCode
}
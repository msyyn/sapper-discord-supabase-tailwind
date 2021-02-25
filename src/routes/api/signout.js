export async function post(req, res) {
	if (req.method == 'POST') {
		res.clearCookie('discoToken');
		res.clearCookie('discoRefresh', { path: '/api/refresh' });
		return res.end(JSON.stringify({ success: true }));
	}
}

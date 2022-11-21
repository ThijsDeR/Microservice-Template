export function sendResponse(req, res, status, title, version = 1, data = null, error = null) {
    res.status(status).json({
        "title": title,
        "version": version,
        "method": req.method,
        "link": req.protocol + "://" + req.get('host') + req.originalUrl,
        "data": data,
        "error": error
    })
}
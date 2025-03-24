const validatePathMiddleware = (req, res, next) => {
    const expectedPath = '/rentals/total'; 
    if (req.path !== expectedPath) {
        return res.status(404).send('Not Found');
    }
    next();
};

export { validatePathMiddleware };
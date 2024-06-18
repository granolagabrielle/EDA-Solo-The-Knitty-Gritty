const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 5001;

// Middleware Includes
const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// Route Includes
const userRouter = require('./routes/user.router');
const yarnRouter = require('./routes/yarn-inventory.router');
const patternsRouter = require('./routes/pattern-inventory.router');
const projectRouter = require('./routes/project-tracking.router');
const designerRouter = require('./routes/designers.router');
const difficultyRouter = require('./routes/difficulty.router');
const fiberRouter = require('./routes/fiber.router');
const patternTypeRouter = require('./routes/pattern-type.router');
const yarnBrandRouter = require('./routes/brands.router');
const yarnWeightRouter = require('./routes/weights.router');
const uploadRouter = require('./routes/upload.router');

// Express Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('build'));

// Passport Session Configuration
app.use(sessionMiddleware);

// Start Passport Sessions
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/api/user', userRouter);
app.use('/api/yarn', yarnRouter);
app.use('/api/patterns', patternsRouter);
app.use('/api/projects', projectRouter);
app.use('/api/designers', designerRouter);
app.use('/api/difficulty', difficultyRouter);
app.use('/api/fiber', fiberRouter);
app.use('/api/types', patternTypeRouter);
app.use('/api/brands', yarnBrandRouter);
app.use('/api/weights', yarnWeightRouter);
app.use('/api/upload', uploadRouter);

// Listen Server & Port
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});

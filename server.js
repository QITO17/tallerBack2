const { Model } = require('sequelize');
const app = require('./app');
const userRouter = require('./routes/userRouter');
const repairRouter = require('./routes/repairRouter');
const AppError = require('./utils/appError');

const PORT = 3000;

app.use('/api/v1/users', userRouter);
app.use('/api/v1/repairs', repairRouter);

app.all('*', (req, res, next) => {
  return next(new AppError('No se puede encontrar la url en este sevidor', 404))
});

app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'fail';

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message
  })
})


app.listen(PORT, () => {
  console.log('Bienvenido profe Luis 🐱‍👤🐱‍🏍🐱‍🚀🐱‍👓🐱‍💻🐱‍🐉');
  console.log('Desarrollador Backend Arley Hurtado 😎🤯');
  console.log('Recomendaciones, no lastimar mucho al backend :*v xd');
});

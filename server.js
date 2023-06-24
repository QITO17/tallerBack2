const { Model } = require('sequelize');
const app = require('./app');
const userRouter = require('./routes/userRouter');
const repairRouter = require('./routes/repairRouter');

const PORT = 3000;

app.use('/api/v1/users', userRouter);
app.use('/api/v1/repairs', repairRouter);
app.listen(PORT, () => {
  console.log('Bienvenido profe Luis 🐱‍👤🐱‍🏍🐱‍🚀🐱‍👓🐱‍💻🐱‍🐉');
  console.log('Desarrollador Backend Arley Hurtado 😎🤯');
  console.log('Recomendaciones, no lastimar mucho al backend :*v xd');
});

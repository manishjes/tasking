import userRoute from "../modules/user/userRoute"
import taskRoute from "../modules/taskmanagement/taskRoute"
import viewRoute from "../modules/viewRoute"

export default (app:any) =>{
    app.use('/api/user', userRoute)
    app.use('/api/task', taskRoute)
    app.use('/', viewRoute);
}
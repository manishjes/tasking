import express from "express"
import checkAuth from "../../middlewares/checkAuth"
import controller from "./taskcontroller"
import validation from "./taskValidation"

const router = express.Router()

router.post(`/create-task`,
    checkAuth.user,
    validation.createTask,
    controller.createTask
)

router.put(`/update-task/:task_id`,
    checkAuth.user,
    validation.updateTask,
    controller.updateTask
)


router.get(`/list-task`,
    checkAuth.user,
    controller.listTask
)


router.get(`/task-detail/:task_id`,
    checkAuth.user,
    validation.taskDetail,
    controller.taskDetail
)

router.delete(`/task-delete/:task_id`,
    checkAuth.user,
    controller.deletTask
)

router.put(`/task-status/:task_id`,
    checkAuth.user,
    controller.updateStatus
)

export default router
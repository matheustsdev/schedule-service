import { Render } from "../../classes/Render.js"
import { api } from "../../services/api.js"

// Header injection
Render.header()

const schedules = await api.get("schedule/user?userId=6b32bdb1-cc10-4bb3-b699-2178b47a2be5", {
    headers: {
        Authorization: "$2b$15$7gHhaZC7CHZlF.RFqtAY7ORO5VscJsvNxB8nUrxfYCXpFI5/zst3."
    },
}).then((response) => response.data.data
).catch((error) => {
    console.log(error)
})

const sortedSchedule = schedules.sort(schedule => schedule.start_time)

const mainElement = document.querySelector("main")

Render.inner(mainElement, sortedSchedule.map(schedule => `
        <div id="${schedule.schedule_id}" class="schedule__item">
            <div class="item__name">
                <h3>${schedule.Service.name}</h3>
                <p>${schedule.Worker.name}</p>
            </div>
            <div class="item__datetime">
                <div class="item__time">
                    <img src="../../assets/icons/clock.svg"/>
                    <p>${new Date(schedule.start_time).toLocaleTimeString("pt-BR",{
                        hour: "2-digit",
                        minute: "2-digit"
                    })}</p>
                </div>
                <div class="item__date">
                    <img src="../../assets/icons/calendar.svg"/>
                    <p>${new Date(schedule.start_time).toLocaleDateString("pt-BR",{
                        day: "2-digit",
                        month: "short",
                        year: "numeric"
                    })}</p>
                </div>
            </div>
            <div class="item__actions">
                <button id="modaltBtn-${schedule.schedule_id}" type="button" data-toggle="modal" data-target="#deleteModal-${schedule.schedule_id}">
                    <img src="../../assets/icons/delete.svg"/>
                </button>
            </div>
        </div>
        <div class="modal fade" id="deleteModal-${schedule.schedule_id}" tabindex="-1" role="dialog" aria-labelledby="deleteModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Deletar agendamentos</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        Deseja realmente deletar seu agendamento?
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                        <button id="deleteBtn-${schedule.schedule_id}" type="button" class="btn btn-danger" data-dismiss="modal">Deletar</button>
                    </div>
                </div>
            </div>
        </div>
    `).join("")
)

async function deleteSchedule(scheduleId) {
    await api.delete(`schedule/delete?scheduleId=${scheduleId}`, {
        headers: {
            Authorization: "$2b$15$7gHhaZC7CHZlF.RFqtAY7ORO5VscJsvNxB8nUrxfYCXpFI5/zst3."
        }
    }).then(() => {
        location.reload()
    }).catch((error) => {
        console.log(error)
    })
}

sortedSchedule.forEach(schedule => {
    const deleteBtn = document.querySelector(`#deleteBtn-${schedule.schedule_id}`)

    deleteBtn.addEventListener("click",() => deleteSchedule(schedule.schedule_id))
})
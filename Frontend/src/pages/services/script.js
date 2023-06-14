import { Render } from "../../classes/Render.js"
import { api } from "../../services/api.js"

Render.header()

const services = await api.get('service', {
    headers: {
        Authorization: "6b32bdb1-cc10-4bb3-b699-2178b47a2be5"
    }
})
.then(res => res.data.data)
.catch(err => {
    console.log(err)
})

console.log(services)

const listElement = document.querySelector('.service-list')

Render.inner(listElement, services.map(service => 
`
    <button class="list-item" type="button" data-toggle="modal" data-target="#modal-${service.service_id}">
        <p class="service-type">cabelo</p>
        <h4 class="service-name">${service.name}</h4>
        <div class="service-infos">
            <div class="service-info-time">
                <img src="../../assets/imgs/timer.svg" alt="clock">
                <p>${service.time} minutos</p>
            </div>
            <p class="service-info-price">R$ ${service.price},00</p>
        </div>
    </button>

    <div class="modal fade" id="modal-${service.service_id}" tabindex="-1" role="dialog" aria-labelledby="${service.name}-modal" aria-hidden="true">
    <div class="modal-dialog" role="document">
    <div class="modal-content">
        <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">${service.name} - ${service.time}min - R$ ${service.price},00</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
        </div>
        <div class="modal-body">
        <!-- Content -->
            <section class="choices" id="choices-user">
                <div class="staff">
                    <h3>Selecione um profissional:</h3>
                    ${
                        service.WorkersServices.map(worker => `
                        <div class="div-staff-input">
                            <input type="radio" id="worker-${worker.User.user_id}" name="staff-name" value="${worker.User.name}" class="staff-input-item" required>
                            <label for="worker-${worker.User.user_id}">${worker.User.name}</label>
                        </div>
                        `).join("")
                    }
                </div>
                <div class="day">
                    <label for="date">Selecione o dia:</label>
                    <div class="input-div">
                        <input id="date-${service.service_id}" class="date-input" type="date"
                        />
                    </div>
                </div>
                
                <h3>Selecione um horário disponível:</h3>
                <div class="hour-available" id="hours-${service.service_id}">
                    
                </div>
                <div class="error"></div>
            </section>
            </div>
        <!-- End Content -->
        <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Fechar</button>
        <button id="schedule-${service.service_id}" type="button" class="btn btn-primary">Marcar</button>
        </div>
    </div>
    </div>
    </div>
`    
).join('')
)

let selectedDate = ""

services.forEach(service => {
    service.WorkersServices.forEach(worker => {
        const inputRadioValue = document.querySelector(`#worker-${worker.User.user_id}`)

        inputRadioValue.addEventListener('click', async (e) => {
            console.log(e.target.value)

            const hours = document.querySelector(`#hours-${service.service_id}`)

            console.log(new Date(new Date(selectedDate).getTime() + 1000 * 60 * 60 * 3))

            const availableHours = await api.post("schedule/available", {
                userId: worker.User.user_id,
                serviceId: service.service_id,
                date: new Date(selectedDate).getTime() + 1000 * 60 * 60 * 3 
            }).then(res => res.data.data)
            .catch(err => {console.log(err)})

            console.log(availableHours)

            Render.inner(hours, availableHours.map(hour => `
                <div class="div-hour-input">
                    <input type="radio" id="hour-${new Date(hour).getTime()}" name="hour-${service.service_id}" class="hour-input-item" value="${hour}">
                    <label for="hour-${new Date(hour).getTime()}">${new Date(hour).toLocaleTimeString("pt-BR", {
                        hour: "2-digit",
                        minute: "2-digit"
                    })}</label>
                </div>
            `).join(""))

            availableHours.forEach(hour => {
                const inputRadioHour = document.querySelector(`#hour-${new Date(hour).getTime()}`)

                inputRadioHour.addEventListener('click', async (e) => {
                    console.log(e.target.value)
                })
            })
        })


    })

    const dateElement = document.querySelector(`#date-${service.service_id}`)

    dateElement.addEventListener('change', async (e) => {
        e.preventDefault()

        selectedDate = e.target.value
    })



    const scheduleBtn = document.querySelector(`#schedule-${service.service_id}`)

    scheduleBtn.addEventListener('click', async (e) => {
        e.preventDefault()
                    
        const inputRadioValue = document.querySelector(`input[name="hour-${service.service_id}"]:checked`)

        console.log(inputRadioValue.value)

        const start_time = new Date(inputRadioValue.value)
        const end_time = new Date(start_time.getTime() + service.time * 60 * 1000)

        const workerId = document.querySelector(`input[name="staff-name"]:checked`).id.split("worker-")[1]

        const createdSchedule = await api.post("schedule/create", {
                start_time,
                end_time,
                user_id_fk: "6b32bdb1-cc10-4bb3-b699-2178b47a2be5",
                worker_id_fk: workerId,
                service_id_fk: service.service_id,
                headers: {
                    Authorization: "$2b$15$7gHhaZC7CHZlF.RFqtAY7ORO5VscJsvNxB8nUrxfYCXpFI5/zst3."
                }
        }).then(res => res.data.data)
        .then(() => location.reload())

        console.log(createdSchedule)
    })
})
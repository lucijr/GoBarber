import { uuid } from 'uuidv4';
import { isEqual } from 'date-fns';

import IAppointment from '@modules/appointments/entities/IAppointment';

import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import IAppointmentsRespository from '../IAppointmentsRepository';

class AppointmentsRepository implements IAppointmentsRespository {
  private appointments: IAppointment[] = [];

  public async findByDate(date: Date): Promise<IAppointment | undefined> {
    const findAppointment = this.appointments.find(appointment =>
      isEqual(appointment.date, date),
    );

    return findAppointment;
  }

  public async create({
    provider_id,
    date,
  }: ICreateAppointmentDTO): Promise<IAppointment> {
    const appointment: IAppointment = { id: uuid(), date, provider_id };

    this.appointments.push(appointment);
    return appointment;
  }
}

export default AppointmentsRepository;

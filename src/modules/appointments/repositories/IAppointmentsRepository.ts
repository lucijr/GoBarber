import IAppointment from '../entities/IAppointment';

import ICreateAppointmentDTO from '../dtos/ICreateAppointmentDTO';

export default interface IAppointmentsRespository {
  create(data: ICreateAppointmentDTO): Promise<IAppointment>;
  findByDate(date: Date): Promise<IAppointment | undefined>;
}

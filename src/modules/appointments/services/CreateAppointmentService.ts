import { startOfHour } from 'date-fns';
import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/error/AppError';
import IAppointment from '@modules/appointments/entities/IAppointment';
import IAppointmentsRespository from '../repositories/IAppointmentsRepository';

interface IRequest {
  provider_id: string;
  date: Date;
}
@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRespository,
  ) {}

  public async execute({ provider_id, date }: IRequest): Promise<IAppointment> {
    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentInSameDate) {
      throw new AppError('This appointment is already booked.');
    }

    const appointment = await this.appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
    });

    return appointment;
  }
}

export default CreateAppointmentService;

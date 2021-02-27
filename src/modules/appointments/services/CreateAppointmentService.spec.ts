import AppError from '@shared/error/AppError';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

describe('CreateAppointment', () => {
  it('should be able to create a new appointment', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();

    const createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );

    const appointment = await createAppointment.execute({
      date: new Date(),
      provider_id: '1321465486456',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('1321465486456');
  });

  it('should not be able to create two appointments on the same time', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();

    const createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );

    const appointmentDate = new Date(2021, 2, 25, 2);

    await createAppointment.execute({
      date: appointmentDate,
      provider_id: '1321465486456',
    });

    expect(createAppointment.execute({
      date: appointmentDate,
      provider_id: '1321465486456',
    }),
    ).rejects.toBeInstanceOf(AppError);

  });

});

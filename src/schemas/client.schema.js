import z from 'zod'

export const clientSchema = z.object({
    nombre: z.string({
        required_error: 'el campo nombre es requerido'
    }),
    descripcion: z.string({
        required_error: 'el campo descripcion es requerido'
    }).optional(),
    direccion: z.string({
        required_error: 'el campo deberia ser un string'
    }).optional(),
    web: z.string(
        {required_error: 'el campo deberia ser un string'}
    ).optional(),
    industria: z.string({
        required_error: 'el campo deberia ser un string'
    }).optional(),
    estado: z.string({
        required_error: 'el campo deberia ser un string'
    }).optional(),
    telefono: z.string({
        required_error: 'el campo deberia ser un string'
    }).optional()
})
// src/app/core/config/permisos.config.ts

export const ROLES = {
  SUPER_ADMIN: 0,
  ADMIN: 1,
  GERENTE: 2,
  COORDINADOR: 3,
  SUPERVISOR: 4,
  ASESOR: 5,
} as const;

export const PERMISOS: Record<keyof typeof ROLES, string[]> = {
  SUPER_ADMIN: ['crear_usuarios', 'ver_reportes', 'asignar_roles'],
  ADMIN: ['crear_usuarios', 'ver_reportes'],
  GERENTE: ['ver_reportes'],
  COORDINADOR: ['ver_equipo'],
  SUPERVISOR: ['ver_equipo'],
  ASESOR: [],
};

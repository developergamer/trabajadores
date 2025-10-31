export type Perfil = {
  id: string;
  persona_id: number | null;
  rol_id: number | null;
  zona_id: number | null;
  metadata?: any;
  telefono_contacto?: string;
  fecha_ingreso?: string;
  activo: boolean;
};

interface RolData {
  codigo: string;
  permisos: string[];
}

export interface PerfilConRol {
  rol: RolData;
}

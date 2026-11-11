export interface NodoGrafo {
  id: string;
  tipo: 'persona' | 'ciudad';
  nombre: string;
  edad?: number;
  ciudadId?: string;
}

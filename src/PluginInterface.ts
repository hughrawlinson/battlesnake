export interface PluginInterface {
  onListening?: (port: string, path: string) => any;
}

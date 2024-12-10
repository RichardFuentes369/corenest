-- Asignar modulos
  INSERT INTO `mod_permisos_modulo_asignacion` (`nombre_permiso`, `user_id`) VALUES ('usuarios', '1');
-- Asignar submodulos
  INSERT INTO `mod_permisos_modulo_asignacion` (`nombre_permiso`, `modulo_padre_id`, `user_id`) VALUES ('administradores', '1', '1');
  INSERT INTO `mod_permisos_modulo_asignacion` (`nombre_permiso`, `modulo_padre_id`, `user_id`) VALUES ('finales', '1', '1');
-- Asignar permisos sobre submodulos
  INSERT INTO `mod_permisos_modulo_asignacion` (`nombre_permiso`, `modulo_padre_id`, `user_id`) VALUES ('ver', '2', '1');

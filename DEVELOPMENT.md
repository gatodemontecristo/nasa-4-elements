# 🛠️ Development Guidelines

Este proyecto usa herramientas automatizadas para mantener la calidad del código y consistencia en el estilo.

## 📋 Herramientas Configuradas

### ✅ **Prettier** - Formateo de Código

- **Auto-formatea** el código al guardar en VSCode
- **Ordena clases** de Tailwind automáticamente
- **Configuración**: `.prettierrc`

### ✅ **ESLint** - Análisis de Código

- **Reglas TypeScript** y React optimizadas
- **Integración** con Next.js
- **Auto-fix** disponible

### ✅ **Husky** - Git Hooks

- **Pre-commit**: Ejecuta lint-staged
- **Commit-msg**: Valida formato de mensajes

### ✅ **lint-staged** - Optimización

- Solo procesa archivos **modificados**
- Ejecuta formateo y validación **automáticamente**

## 🚀 Comandos Disponibles

```bash
# Desarrollo
yarn dev              # Iniciar servidor de desarrollo

# Calidad de código
yarn lint             # ESLint con auto-fix
yarn lint:check       # ESLint solo verificación
yarn prettier         # Formatear todos los archivos
yarn prettier:check   # Verificar formato
yarn format          # Formatear + Linter completo

# Build y deployment
yarn build            # Build para producción
yarn start            # Servidor de producción
```

## 📝 Conventional Commits

Los mensajes de commit deben seguir el formato:

```
<type>[optional scope]: <description>
```

### Tipos válidos:

- **feat**: Nuevas funcionalidades
- **fix**: Corrección de bugs
- **docs**: Cambios en documentación
- **style**: Cambios de formato (sin afectar lógica)
- **refactor**: Refactoring sin cambios funcionales
- **perf**: Mejoras de rendimiento
- **test**: Añadir o actualizar tests
- **chore**: Tareas de mantenimiento
- **ci**: Cambios en CI/CD
- **build**: Cambios en build system
- **revert**: Revertir commits previos

### ✅ Ejemplos válidos:

```bash
feat: add user authentication
fix: resolve carousel navigation bug
docs: update API documentation
feat(auth): implement login functionality
refactor(components): reorganize sidebar structure
```

### ❌ Ejemplos inválidos:

```bash
added new feature        # No sigue el formato
Fix bug                  # Mayúscula incorrecta
update                   # Muy vago
```

## 🔄 Flujo de Trabajo

1. **Editar código** → VSCode formatea automáticamente
2. **Stage archivos** → `git add .`
3. **Hacer commit** → `git commit -m "feat: add new feature"`
   - ✅ Husky ejecuta **pre-commit** (lint-staged)
   - ✅ Husky valida **commit message** formato
4. **Push** → `git push origin branch-name`

## 🚫 Si hay errores

### Pre-commit falla:

```bash
# Ver detalles del error
yarn lint:check
yarn prettier:check

# Corregir automáticamente
yarn format
```

### Commit message inválido:

```bash
# El hook mostrará el formato correcto
# Ejemplo de mensaje correcto:
git commit -m "feat: add particle background component"
```

## 🎯 Configuración VSCode

El proyecto incluye configuración automática para VSCode:

- **Format on Save**: ✅ Activado
- **ESLint Auto-fix**: ✅ Activado
- **Prettier**: ✅ Como formateador por defecto

## 📁 Archivos de Configuración

- `.prettierrc` - Configuración de Prettier
- `.prettierignore` - Archivos ignorados por Prettier
- `eslint.config.mjs` - Configuración de ESLint
- `.husky/` - Git hooks configurados
- `package.json` - Scripts y lint-staged config
- `.vscode/settings.json` - Configuración de VSCode

---

**✨ Con esta configuración, el código se mantiene limpio, consistente y de alta calidad automáticamente!**

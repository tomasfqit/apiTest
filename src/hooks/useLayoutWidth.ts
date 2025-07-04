import { createContext, useContext } from "react";

// Context para compartir el ancho del componente
interface LayoutContextType {
	componentWidth: number;
	componentHeight: number;
}

export const LayoutContext = createContext<LayoutContextType>({ componentWidth: 0, componentHeight: 0 });

// Hook personalizado para usar el ancho en componentes hijos
export const useLayoutWidth = () => {
	const context = useContext(LayoutContext);
	if (!context) {
		throw new Error('useLayoutWidth debe usarse dentro de MainLayoutUIView');
	}
	return {
		componentWidth: context.componentWidth,
		componentHeight: context.componentHeight,
	};
};

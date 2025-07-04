import { useMemo } from 'react';

interface UseLayoutHeightsProps {
	headerHeight?: number;
	footerHeight?: number;
	additionalOffset?: number;
}

interface LayoutHeights {
	minHeight: string;
	maxHeight: string;
	containerStyle: React.CSSProperties;
}

export const useLayoutHeights = ({
	headerHeight = 86,
	footerHeight = 69,
	additionalOffset = 0
}: UseLayoutHeightsProps = {}): LayoutHeights => {
	
	const heights = useMemo(() => {
		const minHeight = `calc(100vh - ${headerHeight + additionalOffset}px)`;
		const maxHeight = `calc(100vh - ${footerHeight + additionalOffset}px)`;
		
		return {
			minHeight,
			maxHeight,
			containerStyle: {
				'--header-height': `${headerHeight}px`,
				'--footer-height': `${footerHeight}px`,
				'--additional-offset': `${additionalOffset}px`,
				'--min-height': minHeight,
				'--max-height': maxHeight,
				minHeight,
				maxHeight,
			} as React.CSSProperties
		};
	}, [headerHeight, footerHeight, additionalOffset]);

	return heights;
};

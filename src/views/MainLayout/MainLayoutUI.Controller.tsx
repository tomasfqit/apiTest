import { ReactNode } from "react";
import { MainLayoutUIView } from "./MainLayoutUI.view";
interface MainLayoutProps {
	children: ReactNode;
}

const MainLayoutUI = ({ children }: MainLayoutProps) => {

	return (
		<MainLayoutUIView children={children} />
	);
};

export default MainLayoutUI;

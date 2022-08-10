import {useEffect} from "react";

const useWindowResizeDetector = ({ onResize, onScroll }: Props) => {
	useEffect(() => {
		window.addEventListener("resize", onResize);
		window.addEventListener("scroll", onScroll);
		
		return () => {
			window.removeEventListener("resize", onResize);
			window.removeEventListener("scroll", onScroll);
		};
	}, [onResize]);
};

interface Props {
	onResize: () => void,
	onScroll: () => void
}

export default useWindowResizeDetector;
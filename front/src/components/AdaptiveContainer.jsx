/**
 * 화면의 크기에 따라 적당한 너비를 지정하는 container를 생성합니다
 * 
 * - children: 내부에 포함할 요소
 * - className: 내부 요소에 추가할 className
 *  
 * @returns 생성된 container
 */
export default function AdaptiveContainer({ children, className = "" }) {
	return (
		<div className={`mx-auto px-2.5 md:px-0 w-full md:w-8/12 lg:w-6/12 ${className}`}>
			{children}
		</div>
	);
}

import icon from "../components/common/Icon/icon.module.scss";
import Icon from "../components/common/Icon";

const icons = {
	home:
		<>
			<path d="M152.928,85.912l-59.89-49.406c-2.771-2.287-6.773-2.287-9.545,0l-59.89,49.406 c-1.728,1.425-2.728,3.546-2.728,5.785v74.544c0,4.143,3.357,7.5,7.5,7.5h119.779c4.143,0,7.5-3.357,7.5-7.5V91.697 C155.656,89.458,154.656,87.337,152.928,85.912z M96.196,158.741H80.336v-41.524h15.859V158.741z M140.656,158.741h-29.46v-49.024 c0-4.143-3.357-7.5-7.5-7.5H72.836c-4.143,0-7.5,3.357-7.5,7.5v49.024h-29.46V95.233l52.39-43.219l52.39,43.219V158.741z" />
			<path d="M173.72,70.866c-16.706-13.382-32.458-26.178-49.561-40.261 c-5.109-4.591-10.479-8.938-15.675-13.144c-5.087-4.118-10.348-8.377-15.201-12.745c-2.854-2.568-7.182-2.568-10.035,0 c-4.854,4.368-10.114,8.627-15.201,12.745c-5.195,4.205-10.565,8.553-15.675,13.144C35.27,44.689,19.518,57.484,2.812,70.866 c-3.233,2.589-3.755,7.31-1.165,10.542c2.589,3.232,7.311,3.755,10.542,1.165C28.991,69.116,44.829,56.249,62.034,42.08 c0.085-0.069,0.168-0.141,0.25-0.215c4.854-4.368,10.114-8.627,15.201-12.745c3.559-2.88,7.199-5.827,10.781-8.873 c3.582,3.046,7.223,5.993,10.781,8.873c5.087,4.118,10.348,8.377,15.201,12.745c0.082,0.074,0.165,0.146,0.25,0.215 c17.204,14.169,33.043,27.036,49.845,40.493c1.384,1.108,3.039,1.646,4.684,1.646c2.198,0,4.377-0.962,5.858-2.812 C177.475,78.176,176.953,73.455,173.72,70.866z" />
		</>,
	
	shops:
		<>
			<path d="M0 0h24v24H0V0z" fill="none" />
			<path d="M19 6h-2c0-2.76-2.24-5-5-5S7 3.24 7 6H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-7-3c1.66 0 3 1.34 3 3H9c0-1.66 1.34-3 3-3zm7 17H5V8h14v12zm-7-8c-1.66 0-3-1.34-3-3H7c0 2.76 2.24 5 5 5s5-2.24 5-5h-2c0 1.66-1.34 3-3 3z" />
		</>,
	
	discounts:
		<>
			<path d="M12.79,21L3,11.21v2c0,0.53,0.21,1.04,0.59,1.41l7.79,7.79c0.78,0.78,2.05,0.78,2.83,0l6.21-6.21 c0.78-0.78,0.78-2.05,0-2.83L12.79,21z" /><path d="M11.38,17.41c0.39,0.39,0.9,0.59,1.41,0.59c0.51,0,1.02-0.2,1.41-0.59l6.21-6.21c0.78-0.78,0.78-2.05,0-2.83l-7.79-7.79 C12.25,0.21,11.74,0,11.21,0H5C3.9,0,3,0.9,3,2v6.21c0,0.53,0.21,1.04,0.59,1.41L11.38,17.41z M5,2h6.21L19,9.79L12.79,16L5,8.21 V2z" />
			<circle cx="7.25" cy="4.25" r="1.25" />
		</>,
	
	events:
		<>
			<path d="M0 0h24v24H0V0z" fill="none" />
			<path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2zm-7 5h5v5h-5z" />
		</>,
	
	map:
		<>
			<path d="M0 0h24v24H0V0z" fill="none" />
			<path d="M20.5 3l-.16.03L15 5.1 9 3 3.36 4.9c-.21.07-.36.25-.36.48V20.5c0 .28.22.5.5.5l.16-.03L9 18.9l6 2.1 5.64-1.9c.21-.07.36-.25.36-.48V3.5c0-.28-.22-.5-.5-.5zM10 5.47l4 1.4v11.66l-4-1.4V5.47zm-5 .99l3-1.01v11.7l-3 1.16V6.46zm14 11.08l-3 1.01V6.86l3-1.16v11.84z" />
		</>,
	
	contacts:
		<>
			<path d="M0 0h24v24H0V0z" fill="none" />
			<path d="M11 7h2v2h-2zm0 4h2v6h-2zm1-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
		</>,
	
	menu:
		<>
			<path d="M12.03,84.212h360.909c6.641,0,12.03-5.39,12.03-12.03c0-6.641-5.39-12.03-12.03-12.03H12.03 C5.39,60.152,0,65.541,0,72.182C0,78.823,5.39,84.212,12.03,84.212z"/>
			<path d="M372.939,180.455H12.03c-6.641,0-12.03,5.39-12.03,12.03s5.39,12.03,12.03,12.03h360.909c6.641,0,12.03-5.39,12.03-12.03 S379.58,180.455,372.939,180.455z"/>
			<path d="M372.939,300.758H12.03c-6.641,0-12.03,5.39-12.03,12.03c0,6.641,5.39,12.03,12.03,12.03h360.909 c6.641,0,12.03-5.39,12.03-12.03C384.97,306.147,379.58,300.758,372.939,300.758z"/>
		</>,
	
	vk:
		<>
			<Icon viewBox={"0 0 95.481 95.481"} classes={`${icon.icon} ${icon.hovered}`}>
				<path d="m43.041 67.254c-7.402-0.772-14.076-2.595-19.79-7.064-0.709-0.556-1.441-1.092-2.088-1.713-2.501-2.402-2.753-5.153-0.774-7.988 1.693-2.426 4.535-3.075 7.489-1.682 0.572 0.27 1.117 0.607 1.639 0.969 10.649 7.317 25.278 7.519 35.967 0.329 1.059-0.812 2.191-1.474 3.503-1.812 2.551-0.655 4.93 0.282 6.299 2.514 1.564 2.549 1.544 5.037-0.383 7.016-2.956 3.034-6.511 5.229-10.461 6.761-3.735 1.448-7.826 2.177-11.875 2.661 0.611 0.665 0.899 0.992 1.281 1.376 5.498 5.524 11.02 11.025 16.5 16.566 1.867 1.888 2.257 4.229 1.229 6.425-1.124 2.4-3.64 3.979-6.107 3.81-1.563-0.108-2.782-0.886-3.865-1.977-4.149-4.175-8.376-8.273-12.441-12.527-1.183-1.237-1.752-1.003-2.796 0.071-4.174 4.297-8.416 8.528-12.683 12.735-1.916 1.889-4.196 2.229-6.418 1.15-2.362-1.145-3.865-3.556-3.749-5.979 0.08-1.639 0.886-2.891 2.011-4.014 5.441-5.433 10.867-10.88 16.295-16.322 0.359-0.362 0.694-0.746 1.217-1.305z"/>
				<path d="m47.55 48.329c-13.205-0.045-24.033-10.992-23.956-24.218 0.076-13.372 10.911-24.148 24.246-24.111 13.362 0.036 24.087 10.967 24.02 24.478-0.068 13.199-10.971 23.897-24.31 23.851zm12.001-24.186c-0.023-6.567-5.253-11.795-11.807-11.801-6.609-7e-3 -11.886 5.316-11.835 11.943 0.049 6.542 5.324 11.733 11.896 11.709 6.552-0.023 11.768-5.285 11.746-11.851z"/>
			</Icon>
		</>,
	
	odnoklassniki:
		<>
			<path d="M17.802 12.298s1.617 1.597 2.017 2.336a.127.127 0 0 1 .018.035c.163.273.203.487.123.645-.135.261-.592.392-.747.403h-2.858c-.199 0-.613-.052-1.117-.4-.385-.269-.768-.712-1.139-1.145-.554-.643-1.033-1.201-1.518-1.201a.548.548 0 0 0-.18.03c-.367.116-.833.639-.833 2.032 0 .436-.344.684-.585.684H9.674c-.446 0-2.768-.156-4.827-2.327C2.324 10.732.058 5.4.036 5.353c-.141-.345.155-.533.475-.533h2.886c.387 0 .513.234.601.444.102.241.48 1.205 1.1 2.288 1.004 1.762 1.621 2.479 2.114 2.479a.527.527 0 0 0 .264-.07c.644-.354.524-2.654.494-3.128 0-.092-.001-1.027-.331-1.479-.236-.324-.638-.45-.881-.496.065-.094.203-.238.38-.323.441-.22 1.238-.252 2.029-.252h.439c.858.012 1.08.067 1.392.146.628.15.64.557.585 1.943-.016.396-.033.842-.033 1.367 0 .112-.005.237-.005.364-.019.711-.044 1.512.458 1.841a.41.41 0 0 0 .217.062c.174 0 .695 0 2.108-2.425.62-1.071 1.1-2.334 1.133-2.429.028-.053.112-.202.214-.262a.479.479 0 0 1 .236-.056h3.395c.37 0 .621.056.67.196.082.227-.016.92-1.566 3.016-.261.349-.49.651-.691.915-1.405 1.844-1.405 1.937.083 3.337z"/>
		</>
};

export default icons;
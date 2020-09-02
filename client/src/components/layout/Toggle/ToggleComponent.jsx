import React from "react";
import ToggleTitle from "./ToggleTitle";
import ToggleContent from "./ToggleContent";

//import { toggle } from '../../assets/js/toggle';
import {classes } from '../../../assets/scss/modules/toggle.module.scss';

class ToggleComponent extends React.Component {
	componentDidMount() {
		//toggle();
	}

	render() {

		return (
			<div id="toggle__container" className="toggle__content">
				<ul id="toggle__titles" className="toggle__nav">
					{
						this.props.titles.map((el, ind) => {
							return (
								<ToggleTitle
									key={`title_content_${ind}`}
									title={el.title}
									styles={ind === 0 ? `toggle__title active` : `toggle__title`}
									dataId={`toggle-` + ind}
								></ToggleTitle>
							);
						})
					}
				</ul>
				<div>
					{
						this.props.bodies.map((el, ind) => {
							return (
								<ToggleContent
									key={`body_content_${ind}`}
									body={el.body}
									styles={ind === 0 ? `toggle__body visible` : `toggle__body`}
									id={`toggle-` + ind}>
								</ToggleContent>
							)
						})
					}
				</div>
			</div >
		);
	}
};

export default ToggleComponent;

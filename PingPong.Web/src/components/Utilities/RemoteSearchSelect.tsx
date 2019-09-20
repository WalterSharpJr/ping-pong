import React from 'react'

import $ from 'jquery';
import 'select2';
import 'select2/dist/css/select2.css';
import '../../css/select2.css'

export default class RemoteSearchSelect extends React.Component<{ url: string, parentId: string,
																	placeholder: string, 
																	processData: (data, params) => any, formatRequest: (params) => any }>
{
	UniqueId: string;

	constructor(props)
	{
		super(props);

		this.UniqueId = this.generateUniqueId();
	}

	getSelection = () =>
	{
		return $("#" + this.UniqueId).select2('data');
	}

	generateUniqueId()
	{
		var id = "";
		var domain = "abcdefghijklmnopqrstuvwxzy0123456789";

		for(var i = 0; i < 10; i++)
		{
			id += domain[Math.floor(Math.random() * domain.length)];
		}

		return id;
	}

	componentDidMount()
	{
		$("#" + this.UniqueId).select2({
			dropdownParent: $('#' + this.props.parentId),
			ajax: 
			{
				url: this.props.url,
			  	dataType: 'json',
			  	delay: 450,
				data: this.props.formatRequest,
			  	processResults: this.props.processData
			},
			placeholder: this.props.placeholder,
			minimumInputLength: 3,
			
		});

		$(".select2-selection--single").addClass("select2-custom");
		$(".select2-selection__arrow").css("top", "5px");
	}
	
	render()
	{
		return (
			<div>
				<div className="row">
					<div className="col-12">
						<select id={this.UniqueId} style={{ width: '100%' }}></select>
					</div>
				</div>
			</div>
		)
	}
}
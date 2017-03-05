import React from 'react';
import styled from 'styled-components';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

const styles = {
	dialogRoot: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		paddingTop: 0
	},
	dialogContent: {
		transform: 'none',
		position: 'relative',
		width: '800px',
	},
	dialogBody: {
		paddingBottom: 0
	}
};


const textAreaStyle = {
	width: '100%',
	border: ' none',
	fontSize: '14px',
	fontFamily: '"Courier New", Courier, monospace'
};

const DialogTable = styled.table`
	width: 100%;
`;

class SettingsDialog extends React.Component {

	render () {
		return (
			<Dialog
				title={'sipgate accounts'}
				actions={[<FlatButton
					label="Save"
					primary={true}
					onClick={this.props.handleSave}
				/>]}
				contentStyle={ styles.dialogContent }
				bodyStyle={ styles.dialogBody }
				style={ styles.dialogRoot }
				repositionOnUpdate={ false }
				modal={false}
				open={this.props.open}
				onRequestClose={this.props.onRequestClose}
			>

				{'This is not safe for storing production account data. Use only for test accounts!'}
				<DialogTable >
					<tbody style={{width: '100%'}}>
					<tr>
						<td>
						<textarea
							style={textAreaStyle}
							defaultValue={JSON.stringify(this.props.accountsettings, null, 2)}
							ref={(input) => {
								this.props.inputRef(input);
							}}
							rows={24}
							name="settings">
						</textarea>
						</td>
					</tr>
					</tbody>
				</DialogTable>
			</Dialog>
		)
	}
}

export default SettingsDialog;
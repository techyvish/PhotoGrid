import React, {Component} from 'react';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import HeartOne from './HeartOne';

const styles = {
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
    },
    gridList: {
        width: 500,
        height: 500,
        overflowY: 'auto',
        marginBottom: 24,
    },
};

class ImagesCollection extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            tilesData:[]
        }
    }

    render() {
        this.tilesData = this.props.tilesData || [];
        const muiTheme = this.props.muiTheme;
        return (
            <div style={styles.root}>
                <GridList
                    cellHeight={200}
                    style={styles.gridList}
                >
                    <Subheader>IMAGES</Subheader>
                    {console.log(this.tilesData)}
                    {this.tilesData.map((tile) => (
                        <GridTile
                            key={tile.filename}
                            title=" "
                            subtitle=" "
                            actionIcon={<HeartOne muiTheme={muiTheme} filename={tile.filename} fevCount={tile.votes}/>}>
                            <img src={`http://d1hf3xwrjkseu2.cloudfront.net/${tile.filename}`}/>
                        </GridTile>
                    ))}
                </GridList>
            </div>
        );
    }

}

export default ImagesCollection;
//<IconButton><StarBorder color={muiTheme.palette.accent1Color} /></IconButton>
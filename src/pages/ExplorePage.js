import Body from '../components/Body';
import Posts from '../components/Post' 

export default function ExplorePage(){
    return (
        <Body sidebar>
            <Posts content='explore' />
        </Body>
    );
}
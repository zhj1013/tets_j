import React from 'react';
import { Button } from '@future/button/dist/react';
import './index.scss';
import '@/style/lib';


const Home: React.FC = () => {
    return <div className='home' style={{color: 'red'}}>
        <div><Button>发布视频</Button></div>
        <table className="ft-table">
            <colgroup>
                <col width="33%"/>
                <col width="33%"/>
                <col width=""/>
            </colgroup>
            <tbody>
            <tr>
                <th>Tottenham Hotspur</th>
                <th>Real Madrid</th>
                <th>Barcelona</th>
            </tr>
            <tr>
                <td>Harry Kane</td>
                <td>Cristiano Ronaldo</td>
                <td>Lionel Messi</td>
            </tr>
            <tr>
                <td>Christian Eriksen</td>
                <td>Gareth Bale</td>
                <td>Neymar da Silva Santos</td>
            </tr>
            <tr>
                <td>Dele Alli</td>
                <td>James Rodríguez</td>
                <td>Luis Suárez</td>
            </tr>
            <tr>
                <td>Harry Kane</td>
                <td>Cristiano Ronaldo</td>
                <td>Lionel Messi</td>
            </tr>
            </tbody>
        </table>
    </div>
}

export default Home;
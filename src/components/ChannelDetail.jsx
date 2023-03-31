import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { Box } from '@mui/material'
import { Videos, ChannelCard } from './'
import { fetchFromAPI } from '../utils/fetchFromAPI'

const ChannelDetail = () => {

    const { id } = useParams();
    const [channelDetail, setChannelDetail] = useState(null);
    const [videos, setVideos] = useState([])

    useEffect(() => {
        fetchFromAPI(`channels?part=snippet&id=${id}`).then((data) => {
            setChannelDetail(data?.items[0])
        });

        fetchFromAPI(`search?channelId=${id}&part=snippet&order=date`).then((data) => {
            setVideos(data?.items)
        });

    }, [id])


    return (
        <Box minHeight="95vh">
            <Box>
                <div style={{
                    background: 'linear-gradient(to right, #ff8177 0%, #ff867a 0%, #ff8c7f 21%, #f99185 52%, #cf556c 78%, #b12a5b 100%)',
                    zIndex: 10,
                    height: '300px',
                }} />
                <ChannelCard channelDetail={channelDetail} marginTop="-115px" />
            </Box>
            <Box display="flex" p="2">
                <Box sx={{ mr: { sm: '100px' } }} />
                <Videos videos={videos} />
            </Box>
        </Box>
    )
}

export default ChannelDetail
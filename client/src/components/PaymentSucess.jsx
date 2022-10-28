import { VStack ,Image,Text,Button,Box,Heading} from '@chakra-ui/react'
import React from 'react'
import {useSearchParams} from 'react-router-dom'

const PaymentSuccess =()=>{

    const searchQuery = useSearchParams()[0];
    const referenceNum = searchQuery.get("reference");

    return(
        <>
        <div>PaymentSuccess</div>
        <Box>

        <VStack h ="100vh" justifyContent={"center"} >

        <Heading textTransform={"uppercase"}>Order Sucessful</Heading>
        <Text>
            Reference No.{referenceNum}
        </Text>
        </VStack>

        </Box>
        </>
    )
}

export default PaymentSuccess
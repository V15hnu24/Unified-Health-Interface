import { VStack ,Image,Text,Button} from '@chakra-ui/react'
import React from 'react'


const Card =({amount,img,checkoutHandler})=>{

    return(
        <>
        {/* <div>Card</div> */}
        <VStack>
            <Image src={img} boxSize="300" objectFit="cover"/>
            <Text>Rs {amount}</Text>
            <Button onClick={()=>checkoutHandler(amount)}>Buy Now</Button>
        </VStack>
        </>
    )
}

export default Card
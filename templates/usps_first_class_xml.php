API=RateV4&XML= <RateV4Request USERID="052CUSTO1254">
    <Package ID="0">
        <Service>FIRST CLASS</Service>
        <FirstClassMailType>LETTER</FirstClassMailType>
        <ZipOrigination>92154</ZipOrigination> 
        <ZipDestination>{zipcode}</ZipDestination> 
        <Pounds>{pounds}</Pounds> 
        <Ounces>{ounces}</Ounces> 
        <Container>Variable</Container> 
        <Size>Regular</Size> 
        <Width>8</Width> 
        <Length>11</Length> 
        <Height>3</Height> 
        <Girth>22</Girth> 
        <Machinable>false</Machinable> 
        <ReturnLocations>FALSE</ReturnLocations> 
        <ShipDate Option="HFP">{ship_date}</ShipDate>
    </Package> 
</RateV4Request>
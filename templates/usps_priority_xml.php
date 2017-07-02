API=RateV4&XML= <RateV4Request USERID="youruseridnumber">
    <Package ID="0">
        <Service>PRIORITY MAIL</Service>
        <ZipOrigination>92154</ZipOrigination> 
        <ZipDestination>{zipcode}</ZipDestination> 
        <Pounds>{pounds}</Pounds> 
        <Ounces>{ounces}</Ounces> 
        <Container>Variable</Container> 
        <Size>Regular</Size> 
        <Width></Width> 
        <Length></Length> 
        <Height></Height> 
        <Girth></Girth> 
        <Machinable>true</Machinable> 
        <ReturnLocations>FALSE</ReturnLocations> 
        <ShipDate Option="HFP">{ship_date}</ShipDate>
    </Package> 
</RateV4Request>


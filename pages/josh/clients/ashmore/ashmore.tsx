import { Card, Nav } from "react-bootstrap"

export default function Ashmore(){
    return <>
        this is cool
    </>
}
export function AshmoreNav(){
    return <Card className={''}>
        <Card.Body className={''}>
            <Card.Title className={''}><Nav.Link href="/josh/ashmore" className="">Ashmore</Nav.Link></Card.Title>
            <hr />
            <Card.Text>
                <Nav.Link href="/josh/ashmore/yards">Yards</Nav.Link>
                <Nav.Link href="/josh/ashmore/trimmings">Trimmings</Nav.Link>
                <Nav.Link href="/josh/ashmore/hardees">Hardees</Nav.Link>
            </Card.Text>
        </Card.Body>
    </Card>
}
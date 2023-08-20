'use client'
import Link from 'next/link';
import React from 'react'
import { Col, Row, SSRProvider } from 'react-bootstrap';
import useDomainRoot from '../components/domain';
import { SWRConfig } from 'swr';
import jsonFetch from '../lib/,base/jsonFetch';
export default function Main(props) {
    useDomainRoot(props)
    return <SWRConfig value={{ fetcher: jsonFetch }}><Row>
        <Col sm={12}>Redirecting...{JSON.stringify(props)}</Col>
        <Col sm={12}><Link href="/bridge" legacyBehavior><a>Aspect Bridge</a></Link></Col>
        <Col sm={12}><Link href="/josh" legacyBehavior><a>Sunrise Landscapes</a></Link></Col>
        <Col sm={12}><Link href="/sandbox" legacyBehavior><a>Sandbox</a></Link></Col>
        <Col sm={12}><Link href="/xstate" legacyBehavior><a>X State: machine</a></Link></Col>
        <Col sm={12}><Link href="/canvas" legacyBehavior><a>Canvas</a></Link></Col>
        <Col sm={12}><Link href="/chat" legacyBehavior><a>Chat</a></Link></Col>
        <Col sm={12}><Link href="/dragons" legacyBehavior><a>Dragons</a></Link></Col>
        <Col sm={12}><Link href="/wasd" legacyBehavior><a>wasd</a></Link></Col>
    </Row></SWRConfig>
}
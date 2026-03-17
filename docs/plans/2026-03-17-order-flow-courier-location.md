# Full Order Flow + Courier Location Tracking

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** End-to-end order lifecycle — vendor confirms, courier picks up with location sharing, customer sees live status updates.

**Architecture:** Add `courier_lat`, `courier_lng`, `courier_name` columns to orders table. Courier dashboard reads real `ready` orders from orderStore. Geolocation API tracks courier position, saves to Supabase every 15s. Customer OrdersPage polls every 5s for status changes. All portals use the same orderStore async API.

**Tech Stack:** React + TypeScript + Supabase + Geolocation API

---

### Task 1: Add courier columns to orders table

Add `courier_name`, `courier_lat`, `courier_lng` to orders table via Supabase Management API. Add `assignCourier()` and `updateCourierLocation()` methods to orderStore.

### Task 2: Courier Dashboard — real orders from store

Replace hardcoded mock data with orderStore. Show `ready` orders as available. Show real stats (deliveries today, earnings). Accept button calls `orderStore.assignCourier()`.

### Task 3: Courier Delivery — real order + location sharing

When courier accepts, start `navigator.geolocation.watchPosition()`. Update courier location to Supabase every 15s. Show real order details. "Picked up" and "Delivered" buttons update real status.

### Task 4: Customer OrdersPage — polling + live status

Poll orderStore every 5s for active orders. Show status badge updates in real-time. When status is `picked_up`, show courier location + estimated distance.

### Task 5: Courier earnings in header

CourierApp header shows real today's earnings from orderStore (delivered orders × $5 delivery fee).

### Task 6: Build + Deploy

Build check + push to Vercel.

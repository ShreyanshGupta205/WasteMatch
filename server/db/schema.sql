-- WasteMatch MVP Database Schema (PostgreSQL / SQLite Compatible DDL)
-- Version: 1.0.0
-- Regulatory Baseline: Hazardous and Other Wastes (Management and Transboundary Movement) Rules 2016

-- 1. USERS TABLE
CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(64) PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(32) NOT NULL CHECK (role IN ('seller', 'buyer', 'admin')),
    full_name VARCHAR(255) NOT NULL,
    phone VARCHAR(32),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. BUSINESS PROFILES TABLE (KYC & SPCB AUTHORIZATION)
CREATE TABLE IF NOT EXISTS business_profiles (
    id VARCHAR(64) PRIMARY KEY,
    user_id VARCHAR(64) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    business_name VARCHAR(255) NOT NULL,
    gstin VARCHAR(32) NOT NULL,
    pan VARCHAR(32) NOT NULL,
    factory_address TEXT NOT NULL,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    pincode VARCHAR(16) NOT NULL,
    authorized_signatory_name VARCHAR(255) NOT NULL,
    signatory_email VARCHAR(255) NOT NULL,
    signatory_phone VARCHAR(32) NOT NULL,
    industry_type VARCHAR(255) NOT NULL,
    spcb_consent_no VARCHAR(100), -- CTE / CTO
    spcb_hw_auth_no VARCHAR(100), -- SPCB Hazardous Waste Authorization
    spcb_auth_valid_till DATE,
    spcb_authorized_categories TEXT, -- JSON or comma-separated waste codes
    cpcb_recycler_reg_no VARCHAR(100), -- For receivers
    verification_status VARCHAR(32) DEFAULT 'Pending' CHECK (verification_status IN ('Pending', 'Verified', 'Suspended', 'Rejected')),
    rejection_reason TEXT,
    gst_cert_url TEXT,
    pan_doc_url TEXT,
    factory_license_url TEXT,
    spcb_consent_url TEXT,
    spcb_hw_auth_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. RECEIVER ACCEPTANCE PROFILES (BUYER SPECIFICATIONS)
CREATE TABLE IF NOT EXISTS receiver_profiles (
    id VARCHAR(64) PRIMARY KEY,
    buyer_id VARCHAR(64) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    monthly_quota_tonnes NUMERIC(10, 2) NOT NULL DEFAULT 100.0,
    min_ph NUMERIC(4, 2) DEFAULT 0.0,
    max_ph NUMERIC(4, 2) DEFAULT 14.0,
    max_chloride_ppm NUMERIC(12, 2) DEFAULT 200000.0,
    max_metals_ppm NUMERIC(12, 2) DEFAULT 500.0,
    max_moisture_pct NUMERIC(5, 2) DEFAULT 80.0,
    prohibited_contaminants TEXT, -- e.g. "Radioactive, PCBs, Dioxins"
    accepted_waste_categories TEXT NOT NULL, -- e.g. "Acidic Spent Liquor, Alkaline Sludge"
    service_radius_km INT DEFAULT 1000,
    indicative_buying_price_min NUMERIC(10, 2) DEFAULT 500.0,
    indicative_buying_price_max NUMERIC(10, 2) DEFAULT 2500.0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. WASTE STREAMS TABLE (GENERATOR BYPRODUCTS)
CREATE TABLE IF NOT EXISTS waste_streams (
    id VARCHAR(64) PRIMARY KEY,
    seller_id VARCHAR(64) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    source_process VARCHAR(255) NOT NULL,
    physical_form VARCHAR(32) NOT NULL CHECK (physical_form IN ('solid', 'liquid', 'sludge', 'oily')),
    estimated_monthly_quantity_tonnes NUMERIC(10, 2) NOT NULL,
    location_address TEXT NOT NULL,
    pincode VARCHAR(16) NOT NULL,
    hazard_class VARCHAR(64) NOT NULL DEFAULT 'Class 8 Corrosive',
    un_number VARCHAR(32) DEFAULT 'UN 1789',
    has_lab_report BOOLEAN DEFAULT FALSE,
    lab_report_url TEXT,
    lab_report_uploaded_at TIMESTAMP WITH TIME ZONE,
    sds_doc_url TEXT,
    photo_urls TEXT, -- JSON array
    voice_note_url TEXT,
    fingerprint_json TEXT NOT NULL, -- JSON containing pH, chloride, metals, calorific value, moisture, etc.
    confidence_scores_json TEXT NOT NULL, -- JSON containing High/Medium/Low rating per field
    status VARCHAR(32) DEFAULT 'Draft' CHECK (status IN ('Draft', 'Listed', 'Matched', 'Archived')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. LISTINGS TABLE (MARKETPLACE)
CREATE TABLE IF NOT EXISTS listings (
    id VARCHAR(64) PRIMARY KEY,
    waste_stream_id VARCHAR(64) NOT NULL REFERENCES waste_streams(id) ON DELETE CASCADE,
    seller_id VARCHAR(64) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    asking_price_per_tonne NUMERIC(10, 2), -- Can be positive (byproduct sale) or negative (treatment fee)
    available_quantity_tonnes NUMERIC(10, 2) NOT NULL,
    minimum_batch_tonnes NUMERIC(10, 2) DEFAULT 5.0,
    status VARCHAR(32) DEFAULT 'active' CHECK (status IN ('active', 'matched', 'closed')),
    published_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 6. MATCHES & OFFERS TABLE
CREATE TABLE IF NOT EXISTS matches_offers (
    id VARCHAR(64) PRIMARY KEY,
    listing_id VARCHAR(64) NOT NULL REFERENCES listings(id) ON DELETE CASCADE,
    waste_stream_id VARCHAR(64) NOT NULL REFERENCES waste_streams(id) ON DELETE CASCADE,
    seller_id VARCHAR(64) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    buyer_id VARCHAR(64) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    offered_price_per_tonne NUMERIC(10, 2) NOT NULL,
    quantity_tonnes NUMERIC(10, 2) NOT NULL,
    distance_km NUMERIC(8, 2) NOT NULL,
    estimated_transport_cost NUMERIC(10, 2) NOT NULL,
    net_economic_gain NUMERIC(10, 2) NOT NULL,
    co2e_avoided_tonnes NUMERIC(8, 2) DEFAULT 1.6,
    status VARCHAR(32) DEFAULT 'Quoted' CHECK (status IN ('Quoted', 'Countered', 'Accepted', 'Declined', 'Completed')),
    counter_terms TEXT,
    accepted_by VARCHAR(64),
    accepted_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 7. REFERENCE DATA: NABL LABS DIRECTORY (NO LAB DASHBOARD)
CREATE TABLE IF NOT EXISTS labs_directory (
    id VARCHAR(64) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address TEXT NOT NULL,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    pincode VARCHAR(16) NOT NULL,
    contact_phone VARCHAR(32) NOT NULL,
    contact_email VARCHAR(255) NOT NULL,
    nabl_reg_no VARCHAR(64) NOT NULL,
    test_types TEXT NOT NULL, -- e.g. "ICP-OES Heavy Metals, Bomb Calorimetry, TCLP, Flash Point"
    indicative_pricing VARCHAR(100) NOT NULL, -- e.g. "₹3,800 - ₹4,500"
    turnaround_days INT DEFAULT 2,
    rating NUMERIC(2, 1) DEFAULT 4.8,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 8. REFERENCE DATA: TRANSPORTERS DIRECTORY (NO TRANSPORTER DASHBOARD)
CREATE TABLE IF NOT EXISTS transporters_directory (
    id VARCHAR(64) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    base_city VARCHAR(100) NOT NULL,
    coverage_states TEXT NOT NULL, -- e.g. "Delhi NCR, UP, Haryana, Rajasthan"
    vehicle_types TEXT NOT NULL, -- e.g. "Acid-Resistant Rubber-Lined Tanker, Vinyl-Ester FRP Tanker"
    capacity_tonnes NUMERIC(6, 2) NOT NULL DEFAULT 24.0,
    authorized_hazardous BOOLEAN DEFAULT TRUE,
    spcb_transport_permit_no VARCHAR(100) NOT NULL,
    permit_valid_till DATE,
    contact_phone VARCHAR(32) NOT NULL,
    contact_email VARCHAR(255) NOT NULL,
    price_per_km NUMERIC(8, 2) DEFAULT 85.0,
    driver_hazchem_certified BOOLEAN DEFAULT TRUE,
    gps_lora_seal_fitted BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 9. SHIPMENTS & DIGITAL MANIFESTS (FORM 10 & TREMCARD)
CREATE TABLE IF NOT EXISTS shipments (
    id VARCHAR(64) PRIMARY KEY,
    match_id VARCHAR(64) NOT NULL REFERENCES matches_offers(id) ON DELETE CASCADE,
    seller_id VARCHAR(64) NOT NULL REFERENCES users(id),
    buyer_id VARCHAR(64) NOT NULL REFERENCES users(id),
    transporter_id VARCHAR(64) REFERENCES transporters_directory(id),
    scheduled_dispatch_date DATE NOT NULL,
    status VARCHAR(32) DEFAULT 'Scheduled' CHECK (status IN ('Scheduled', 'Picked Up', 'In Transit', 'Delivered')),
    manifest_form_10_no VARCHAR(64) NOT NULL,
    manifest_data_json TEXT NOT NULL, -- Pre-filled Form 10 data
    trem_card_data_json TEXT NOT NULL, -- Emergency response information
    form_10_copy_4_url TEXT, -- Uploaded proof of receipt
    qc_result VARCHAR(32) DEFAULT 'Pending' CHECK (qc_result IN ('Pending', 'Passed', 'Failed')),
    qc_notes TEXT,
    qc_performed_at TIMESTAMP WITH TIME ZONE,
    picked_up_at TIMESTAMP WITH TIME ZONE,
    delivered_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 10. ESCROW TRANSACTIONS TABLE
CREATE TABLE IF NOT EXISTS escrow_transactions (
    id VARCHAR(64) PRIMARY KEY,
    match_id VARCHAR(64) NOT NULL REFERENCES matches_offers(id),
    shipment_id VARCHAR(64) REFERENCES shipments(id),
    buyer_id VARCHAR(64) NOT NULL REFERENCES users(id),
    seller_id VARCHAR(64) NOT NULL REFERENCES users(id),
    amount NUMERIC(12, 2) NOT NULL,
    status VARCHAR(32) DEFAULT 'Held' CHECK (status IN ('Held', 'Released', 'Disputed', 'Refunded')),
    held_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    released_at TIMESTAMP WITH TIME ZONE,
    disputed_at TIMESTAMP WITH TIME ZONE,
    refunded_at TIMESTAMP WITH TIME ZONE,
    dispute_reason TEXT,
    resolution_notes TEXT
);

-- 11. AUDIT DOCUMENTS (DIVERSION CERTIFICATES & TAX INVOICES)
CREATE TABLE IF NOT EXISTS audit_documents (
    id VARCHAR(64) PRIMARY KEY,
    entity_id VARCHAR(64) NOT NULL, -- shipment_id or match_id
    document_type VARCHAR(64) NOT NULL CHECK (document_type IN ('invoice', 'form_10_manifest', 'diversion_certificate', 'audit_pack_zip')),
    title VARCHAR(255) NOT NULL,
    document_url TEXT NOT NULL,
    issued_by VARCHAR(255) NOT NULL,
    issued_to VARCHAR(255) NOT NULL,
    co2e_offset_tonnes NUMERIC(8, 2),
    waste_diverted_tonnes NUMERIC(8, 2),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- INDEXES FOR FAST RBAC & QUERY PERFORMANCE
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
CREATE INDEX IF NOT EXISTS idx_business_profiles_user ON business_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_waste_streams_seller ON waste_streams(seller_id);
CREATE INDEX IF NOT EXISTS idx_listings_status ON listings(status);
CREATE INDEX IF NOT EXISTS idx_matches_seller ON matches_offers(seller_id);
CREATE INDEX IF NOT EXISTS idx_matches_buyer ON matches_offers(buyer_id);
CREATE INDEX IF NOT EXISTS idx_shipments_status ON shipments(status);
CREATE INDEX IF NOT EXISTS idx_escrow_status ON escrow_transactions(status);

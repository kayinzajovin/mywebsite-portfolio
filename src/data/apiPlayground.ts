export interface ApiEndpoint {
  id: string;
  name: string;
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  endpoint: string;
  description: string;
  tags: string[];
  requestHeaders: Record<string, string>;
  requestParams?: Record<string, string>;
  requestBody?: Record<string, any>;
  statusCode: number;
  statusText: string;
  responseLatencyMs: number;
  responseBody: Record<string, any> | Array<any>;
}

export const apiPlaygroundData: ApiEndpoint[] = [
  {
    id: "get-clients",
    name: "List Verified Clients",
    method: "GET",
    endpoint: "/api/v1/clients/?kyc_status=verified&limit=2",
    description: "Retrieves paginated client entities registered in Uganda Exim with validated KYC documents.",
    tags: ["Clients", "DRF Serializer", "FilterBackend"],
    requestHeaders: {
      "Accept": "application/json",
      "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.s4mple...",
    },
    requestParams: {
      "kyc_status": "verified",
      "limit": "2",
      "ordering": "-created_at",
    },
    statusCode: 200,
    statusText: "OK",
    responseLatencyMs: 42,
    responseBody: {
      count: 148,
      next: "/api/v1/clients/?kyc_status=verified&limit=2&offset=2",
      previous: null,
      results: [
        {
          id: "cli_91f8a42c",
          national_id: "CM98024108XXXX",
          business_name: "Victoria Agro Traders Ltd",
          director_name: "Sarah Namukasa",
          primary_contact: "+256 701 *** 892",
          risk_category: "Low",
          kyc_status: "VERIFIED",
          assigned_officer: "Jovin Kayinza (Apprentice)",
          created_at: "2026-02-14T09:30:00Z",
          total_credit_facility_ugx: 45000000,
        },
        {
          id: "cli_34e19b02",
          national_id: "CF01034112XXXX",
          business_name: "Rwenzori Logistics Co",
          director_name: "David Otim",
          primary_contact: "+256 772 *** 119",
          risk_category: "Medium",
          kyc_status: "VERIFIED",
          assigned_officer: "Grace Auma",
          created_at: "2026-03-01T14:15:22Z",
          total_credit_facility_ugx: 28000000,
        },
      ],
    },
  },
  {
    id: "post-loan-apply",
    name: "Submit Loan Application",
    method: "POST",
    endpoint: "/api/v1/loans/apply/",
    description: "Receives a new loan request, validates business collateral constraints, and initializes approval workflow state.",
    tags: ["Loans", "Atomic Transaction", "Validation"],
    requestHeaders: {
      "Content-Type": "application/json",
      "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.s4mple...",
    },
    requestBody: {
      client_id: "cli_91f8a42c",
      facility_type: "COMMERCIAL_EXPANSION",
      requested_amount_ugx: 15000000,
      tenor_months: 18,
      collateral_type: "COMMERCIAL_PROPERTY_TITLE",
      collateral_valuation_ugx: 35000000,
      purpose_statement: "Expansion of cold-storage warehouse facility in Nakawa industrial area.",
    },
    statusCode: 201,
    statusText: "Created",
    responseLatencyMs: 86,
    responseBody: {
      status: "SUCCESS",
      message: "Loan application successfully registered and queued for underwriting.",
      application_ref: "UGX-2026-0042",
      current_stage: "RISK_UNDERWRITING_REVIEW",
      application_summary: {
        principal_ugx: 15000000,
        indicative_interest_rate: "14.5% p.a.",
        monthly_installment_ugx: 932450,
        collateral_coverage_ratio: "2.33x",
      },
      audit_transaction_id: "tx_audit_88190d",
      submitted_at: "2026-11-04T16:45:10Z",
    },
  },
  {
    id: "get-loan-status",
    name: "Get Loan Workflow State",
    method: "GET",
    endpoint: "/api/v1/loans/UGX-2026-0042/status/",
    description: "Inspects multi-stage state-machine transitions and approval checkpoints for a given loan reference.",
    tags: ["Workflow", "State Machine", "Audit Logs"],
    requestHeaders: {
      "Accept": "application/json",
      "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.s4mple...",
    },
    statusCode: 200,
    statusText: "OK",
    responseLatencyMs: 38,
    responseBody: {
      application_ref: "UGX-2026-0042",
      client_name: "Victoria Agro Traders Ltd",
      loan_amount_ugx: 15000000,
      overall_status: "APPROVED_PENDING_DISBURSEMENT",
      workflow_pipeline: [
        { stage: "CLIENT_SUBMISSION", status: "COMPLETED", completed_at: "2026-11-04T16:45:10Z", actor: "Client Portal" },
        { stage: "DOC_VERIFICATION", status: "COMPLETED", completed_at: "2026-11-04T17:10:00Z", actor: "Officer #210" },
        { stage: "UNDERWRITING_RISK", status: "COMPLETED", completed_at: "2026-11-04T17:50:33Z", actor: "Risk Lead" },
        { stage: "EXECUTIVE_APPROVAL", status: "COMPLETED", completed_at: "2026-11-04T18:20:15Z", actor: "Operations Committee" },
        { stage: "DISBURSEMENT", status: "READY_FOR_EXECUTION", completed_at: null, actor: "Treasury" },
      ],
      rbac_access_level: "WRITE_RESTRICTED (Officer Level 2)",
      database_source: "Uganda Exim PostgreSQL Primary Node",
    },
  },
  {
    id: "get-audit-logs",
    name: "Query Security & Audit Log",
    method: "GET",
    endpoint: "/api/v1/audit-logs/?reference=UGX-2026-0042",
    description: "Returns immutable security audit records capturing state transitions, user actors, and client IP addresses.",
    tags: ["Compliance", "Audit Trail", "PostgreSQL"],
    requestHeaders: {
      "Accept": "application/json",
      "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.s4mple...",
    },
    statusCode: 200,
    statusText: "OK",
    responseLatencyMs: 29,
    responseBody: {
      records_count: 3,
      immutable_hash_chain_verified: true,
      logs: [
        {
          log_id: "aud_001928a",
          action: "LOAN_STATE_CHANGE",
          delta: { from: "RISK_UNDERWRITING", to: "EXECUTIVE_APPROVAL" },
          actor_email: "risk.director@ugandaexim.co.ug",
          role: "ROLE_SENIOR_UNDERWRITER",
          client_ip: "197.239.x.x (Kampala, UG)",
          timestamp: "2026-11-04T17:50:33Z",
        },
        {
          log_id: "aud_001927f",
          action: "COLLATERAL_TITLE_VERIFIED",
          document_id: "doc_land_title_881",
          actor_email: "jovin.kayinza@ugandaexim.co.ug",
          role: "ROLE_BACKEND_APPRENTICE",
          client_ip: "197.239.x.x (Refactory Hub)",
          timestamp: "2026-11-04T17:09:44Z",
        },
        {
          log_id: "aud_001920b",
          action: "LOAN_APPLICATION_CREATED",
          actor_email: "system.api_gateway@internal",
          role: "ROLE_SERVICE_GATEWAY",
          client_ip: "10.0.4.12",
          timestamp: "2026-11-04T16:45:10Z",
        },
      ],
    },
  },
];

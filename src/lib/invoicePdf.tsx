import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { RFQRecord } from "@/lib/sheets";
import { appConfig, formatINR } from "@/config/appConfig";

const styles = StyleSheet.create({
  page: { padding: 40, fontSize: 10, fontFamily: "Helvetica", color: "#111827" },
  header: { marginBottom: 20, borderBottom: "2 solid #E76F00", paddingBottom: 12 },
  companyName: { fontSize: 18, fontWeight: 700, color: "#0D1B2A" },
  companySub: { fontSize: 9, color: "#555", marginTop: 2 },
  billTitle: { fontSize: 14, fontWeight: 700, color: "#0D1B2A", marginTop: 20, marginBottom: 8 },
  row: { flexDirection: "row", justifyContent: "space-between", marginBottom: 16 },
  col: { flexDirection: "column" },
  label: { fontSize: 8, color: "#8A9BB0", textTransform: "uppercase", marginBottom: 2 },
  value: { fontSize: 10, color: "#0D1B2A", fontWeight: 700, marginBottom: 6 },
  table: { marginTop: 10, borderTop: "1 solid #E5E7EB" },
  tableHeaderRow: {
    flexDirection: "row",
    backgroundColor: "#F8F9FA",
    paddingVertical: 6,
    paddingHorizontal: 4,
    borderBottom: "1 solid #E5E7EB",
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 6,
    paddingHorizontal: 4,
    borderBottom: "1 solid #F1F1F1",
  },
  th: { fontSize: 8, fontWeight: 700, color: "#0D1B2A", textTransform: "uppercase" },
  td: { fontSize: 9, color: "#0D1B2A" },
  colSku: { width: "20%" },
  colItem: { width: "38%" },
  colQty: { width: "12%", textAlign: "right" },
  colRate: { width: "15%", textAlign: "right" },
  colTotal: { width: "15%", textAlign: "right" },
  totalsBlock: { marginTop: 16, alignItems: "flex-end" },
  totalRow: { flexDirection: "row", justifyContent: "space-between", width: 220, marginBottom: 4 },
  totalLabel: { fontSize: 9, color: "#555" },
  totalValue: { fontSize: 9, color: "#0D1B2A", fontWeight: 700 },
  grandTotalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 220,
    marginTop: 6,
    paddingTop: 6,
    borderTop: "1 solid #0D1B2A",
  },
  grandTotalLabel: { fontSize: 11, fontWeight: 700, color: "#0D1B2A" },
  grandTotalValue: { fontSize: 11, fontWeight: 700, color: "#E76F00" },
  terms: { marginTop: 30, fontSize: 8, color: "#8A9BB0", lineHeight: 1.5 },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 40,
    right: 40,
    fontSize: 8,
    color: "#8A9BB0",
    textAlign: "center",
    borderTop: "1 solid #E5E7EB",
    paddingTop: 8,
  },
});

export function InvoiceDocument({ record }: { record: RFQRecord }) {
  const balanceDue = record.advanceOptIn ? record.estimatedValue - record.advanceAmount : record.estimatedValue;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.companyName}>SWASTIK VALVES INDIA</Text>
          <Text style={styles.companySub}>MAHAVIR VALVES</Text>
          <Text style={styles.companySub}>
            Plot. 1240, St. No: 41, Janta Nagar, Ludhiana - 141003, Punjab (INDIA)
          </Text>
          <Text style={styles.companySub}>
            Tel: +91-161-2503914 | Mobile: +91-98156-52779 | {appConfig.notifyEmail}
          </Text>
        </View>

        <Text style={styles.billTitle}>BILL — {record.orderNumber}</Text>

        <View style={styles.row}>
          <View style={styles.col}>
            <Text style={styles.label}>Bill To</Text>
            <Text style={styles.value}>{record.firmName}</Text>
            <Text style={styles.label}>GST Number</Text>
            <Text style={styles.value}>{record.gstNumber}</Text>
            <Text style={styles.label}>Contact</Text>
            <Text style={styles.value}>
              {record.contactName} — {record.phoneNumber}
            </Text>
          </View>
          <View style={styles.col}>
            <Text style={styles.label}>Delivery Address</Text>
            <Text style={styles.value}>
              {record.address}, {record.city}, {record.state} - {record.pincode}
            </Text>
            <Text style={styles.label}>Order Date</Text>
            <Text style={styles.value}>{new Date(record.timestamp).toLocaleDateString("en-IN")}</Text>
            <Text style={styles.label}>Mode of Purchase / Payment</Text>
            <Text style={styles.value}>
              {appConfig.purchaseModes[record.purchaseMode]} / {appConfig.paymentModes[record.paymentMode]}
            </Text>
          </View>
        </View>

        <View style={styles.table}>
          <View style={styles.tableHeaderRow}>
            <Text style={[styles.th, styles.colSku]}>SKU</Text>
            <Text style={[styles.th, styles.colItem]}>Item</Text>
            <Text style={[styles.th, styles.colQty]}>Qty</Text>
            <Text style={[styles.th, styles.colRate]}>Unit Price</Text>
            <Text style={[styles.th, styles.colTotal]}>Total</Text>
          </View>
          {record.items.map((item, idx) => (
            <View style={styles.tableRow} key={idx}>
              <Text style={[styles.td, styles.colSku]}>{item.sku}</Text>
              <Text style={[styles.td, styles.colItem]}>{item.partName}</Text>
              <Text style={[styles.td, styles.colQty]}>{item.quantity}</Text>
              <Text style={[styles.td, styles.colRate]}>{formatINR(item.rate || 0)}</Text>
              <Text style={[styles.td, styles.colTotal]}>{formatINR((item.rate || 0) * item.quantity)}</Text>
            </View>
          ))}
        </View>

        <View style={styles.totalsBlock}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Order Value</Text>
            <Text style={styles.totalValue}>{formatINR(record.estimatedValue)}</Text>
          </View>
          {record.advanceOptIn && (
            <>
              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Advance Paid ({record.advancePercentage}%)</Text>
                <Text style={styles.totalValue}>{formatINR(record.advanceAmount)}</Text>
              </View>
              <View style={styles.grandTotalRow}>
                <Text style={styles.grandTotalLabel}>Balance Due</Text>
                <Text style={styles.grandTotalValue}>{formatINR(balanceDue)}</Text>
              </View>
            </>
          )}
          {!record.advanceOptIn && (
            <View style={styles.grandTotalRow}>
              <Text style={styles.grandTotalLabel}>Amount Due</Text>
              <Text style={styles.grandTotalValue}>{formatINR(balanceDue)}</Text>
            </View>
          )}
        </View>

        <Text style={styles.terms}>
          Terms & Conditions: This is a computer-generated bill based on the accepted quote. Final invoice with
          applicable GST and freight will be issued at dispatch. Rates are indicative and subject to confirmation
          at the time of production. Goods once dispatched are subject to Swastik Valves India&apos;s standard
          sale terms.
        </Text>

        <Text style={styles.footer}>
          Swastik Valves India — ISO 9001:2008 Certified — Plot. 1240, St. No: 41, Janta Nagar, Ludhiana - 141003,
          Punjab (INDIA)
        </Text>
      </Page>
    </Document>
  );
}

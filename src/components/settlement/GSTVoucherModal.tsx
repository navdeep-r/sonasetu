import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  FileText, 
  X, 
  Printer, 
  Download, 
  ShieldCheck, 
  Building2, 
  MapPin, 
  Calendar 
} from 'lucide-react';

export const GSTVoucherModal: React.FC = () => {
  const { gstModalOpen, setGstModalOpen, selectedJob } = useApp();

  if (!gstModalOpen || !selectedJob || !selectedJob.settlement) return null;

  const settlement = selectedJob.settlement;
  const returnData = selectedJob.returnData;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-xl bg-white text-slate-900 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]">
        {/* Header Bar */}
        <div className="p-3 bg-slate-100 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-amber-600" />
            <span className="font-bold text-xs text-slate-800">
              Form GST ITC-04 • Job-Work Delivery Challan & Voucher
            </span>
          </div>
          <button
            onClick={() => setGstModalOpen(false)}
            className="p-1 text-slate-400 hover:text-slate-700 rounded-lg"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Printable Voucher Paper */}
        <div className="p-6 space-y-4 overflow-y-auto font-sans text-xs bg-white" id="printable-voucher">
          {/* Company Title */}
          <div className="border-b-2 border-slate-800 pb-3 flex justify-between items-start">
            <div>
              <h2 className="font-serif font-black text-base text-slate-900 tracking-wide uppercase">
                {selectedJob.jewellerFirm}
              </h2>
              <p className="text-[11px] text-slate-600">
                Showroom & Registered Workshop • {selectedJob.jewellerCity}
              </p>
              <p className="text-[10px] text-slate-500 font-mono mt-0.5">
                GSTIN: 27AABCZ8912P1ZR • State Code: 27 (Maharashtra)
              </p>
            </div>
            <div className="text-right">
              <span className="bg-amber-100 text-amber-900 font-mono font-bold text-[10px] px-2 py-0.5 rounded border border-amber-300">
                TAX INVOICE / CHALLAN
              </span>
              <p className="text-xs font-mono font-bold text-slate-900 mt-1">
                {settlement.gstVoucherNo}
              </p>
              <p className="text-[10px] text-slate-500 font-mono">Date: {settlement.calculatedAt}</p>
            </div>
          </div>

          {/* Parties Grid */}
          <div className="grid grid-cols-2 gap-4 bg-slate-50 p-3 rounded-xl border border-slate-200">
            <div>
              <span className="text-[10px] font-bold text-slate-500 uppercase block">Principal (Jeweller):</span>
              <p className="font-bold text-slate-900">{selectedJob.jewellerName}</p>
              <p className="text-slate-600 text-[11px]">{selectedJob.jewellerFirm}</p>
              <p className="text-slate-500 text-[10px]">Zaveri Bazaar, Mumbai 400002</p>
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-500 uppercase block">Job-Worker (Karigar):</span>
              <p className="font-bold text-slate-900">{selectedJob.karigarName}</p>
              <p className="text-slate-600 text-[11px]">{selectedJob.karigarWorkshop}</p>
              <p className="text-slate-500 text-[10px]">Rajkot Goldsmiths Guild, Gujarat</p>
            </div>
          </div>

          {/* Line Items Table */}
          <div className="border border-slate-300 rounded-lg overflow-hidden">
            <table className="w-full text-left border-collapse text-[11px]">
              <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-300">
                <tr>
                  <th className="p-2">Description</th>
                  <th className="p-2">HSN Code</th>
                  <th className="p-2 text-right">Gross Wt</th>
                  <th className="p-2 text-right">Purity</th>
                  <th className="p-2 text-right">Making Rate</th>
                  <th className="p-2 text-right">Amount (₹)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 font-mono">
                <tr>
                  <td className="p-2 font-sans font-medium text-slate-900">
                    {selectedJob.title}
                    <span className="block text-[9px] text-slate-500 font-sans">
                      Job Ref: {selectedJob.id} • Order: {selectedJob.orderNumber}
                    </span>
                  </td>
                  <td className="p-2 text-slate-600">{settlement.hsnCode}</td>
                  <td className="p-2 text-right text-slate-900 font-bold">
                    {returnData?.finishedWeight.toFixed(3) || selectedJob.targetOrnamentWeight.toFixed(3)}g
                  </td>
                  <td className="p-2 text-right text-slate-600">{selectedJob.purity}</td>
                  <td className="p-2 text-right text-slate-600">₹{selectedJob.makingChargePerGram}/g</td>
                  <td className="p-2 text-right font-bold text-slate-900">
                    ₹{settlement.grossLabourCharges.toLocaleString('en-IN')}
                  </td>
                </tr>

                {/* Scrap Recovery Line */}
                {returnData && returnData.scrapWeight > 0 && (
                  <tr className="bg-slate-50">
                    <td className="p-2 font-sans text-slate-700">
                      Recovered Process Scrap (Tukda & Chhol)
                    </td>
                    <td className="p-2 text-slate-500">7112</td>
                    <td className="p-2 text-right text-emerald-700 font-bold">
                      {returnData.scrapWeight.toFixed(3)}g
                    </td>
                    <td className="p-2 text-right text-slate-500">89.5%</td>
                    <td className="p-2 text-right text-slate-500">N/A</td>
                    <td className="p-2 text-right text-slate-500">Returned</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Summary Math */}
          <div className="flex justify-end">
            <div className="w-64 space-y-1 text-[11px] font-mono">
              <div className="flex justify-between text-slate-600">
                <span>Sub-Total Labour:</span>
                <span>₹{settlement.grossLabourCharges.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Advance Paid:</span>
                <span className="text-rose-600">-₹{settlement.advanceDeducted.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Gold Variance Adj:</span>
                <span>₹{settlement.goldAdjustmentRupees.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-slate-900 font-bold border-t-2 border-slate-800 pt-1 text-xs">
                <span>Net Payable Disbursed:</span>
                <span className="text-emerald-700">
                  ₹{settlement.netPayableToKarigar.toLocaleString('en-IN')}
                </span>
              </div>
            </div>
          </div>

          {/* Statutory Signatures */}
          <div className="pt-6 border-t border-slate-300 grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="h-10 border-b border-dashed border-slate-400 mx-auto w-36 flex items-center justify-center">
                <span className="text-[10px] text-emerald-700 font-mono font-bold">DIGITALLY SIGNED ✓</span>
              </div>
              <p className="text-[10px] font-bold text-slate-700 mt-1">Authorized Principal Signatory</p>
              <p className="text-[9px] text-slate-500">For {selectedJob.jewellerFirm}</p>
            </div>
            <div>
              <div className="h-10 border-b border-dashed border-slate-400 mx-auto w-36 flex items-center justify-center">
                <span className="text-[10px] text-emerald-700 font-mono font-bold">OTP VERIFIED ✓</span>
              </div>
              <p className="text-[10px] font-bold text-slate-700 mt-1">Goldsmith / Karigar Receiver</p>
              <p className="text-[9px] text-slate-500">{selectedJob.karigarName}</p>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-3 bg-slate-100 border-t border-slate-200 flex justify-end gap-2">
          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 text-white rounded-xl text-xs font-bold hover:bg-slate-700 transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Voucher</span>
          </button>
          <button
            onClick={() => setGstModalOpen(false)}
            className="px-3 py-1.5 bg-amber-500 text-slate-950 rounded-xl text-xs font-bold hover:bg-amber-400 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

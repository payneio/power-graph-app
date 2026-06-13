import { useParams, Link } from "react-router-dom"
import { FileText, ArrowLeft, ExternalLink } from "lucide-react"
import { useSource } from "@/services/api/hooks/useSources"
import QualityRating from "@/components/QualityRating"
import LoadingState from "@/components/LoadingState"
import { formatDate, formatDateTime } from "@/lib/format"

export default function SourceDetail() {
  const { id } = useParams<{ id: string }>()
  const { data: source, isLoading, isError } = useSource(id!)

  if (isLoading) return <LoadingState />
  if (isError || !source)
    return (
      <p className="py-8 text-center text-sm text-[var(--destructive)]">
        Source not found.
      </p>
    )

  return (
    <div>
      <Link
        to="/sources"
        className="mb-4 inline-flex items-center gap-1 text-sm text-[var(--muted)] hover:text-[var(--foreground)]"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Sources
      </Link>

      <div className="rounded-lg border border-[var(--border)] bg-[var(--card)] p-6">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--primary)]/10">
            <FileText className="h-6 w-6 text-[var(--primary)]" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <h1 className="text-xl font-bold">{source.name}</h1>
              <span className="rounded bg-[var(--border)] px-2 py-0.5 text-xs uppercase text-[var(--muted)]">
                {source.type}
              </span>
            </div>

            <div className="mt-4 space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-32 text-xs text-[var(--muted)]">
                  Quality
                </span>
                <QualityRating rating={source.quality_rating} />
              </div>

              {source.url && (
                <div className="flex items-center gap-2">
                  <span className="w-32 text-xs text-[var(--muted)]">URL</span>
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-sm text-[var(--primary)] hover:underline"
                  >
                    {source.url}
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              )}

              {source.publication_date && (
                <div className="flex items-center gap-2">
                  <span className="w-32 text-xs text-[var(--muted)]">
                    Published
                  </span>
                  <span className="text-sm">
                    {formatDate(source.publication_date)}
                  </span>
                </div>
              )}

              <div className="flex items-center gap-2">
                <span className="w-32 text-xs text-[var(--muted)]">
                  Retrieved
                </span>
                <span className="text-sm">
                  {formatDateTime(source.retrieved_at)}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="w-32 text-xs text-[var(--muted)]">
                  Created
                </span>
                <span className="text-sm">
                  {formatDateTime(source.created_at)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

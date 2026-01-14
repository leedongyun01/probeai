import { ModeToggle } from "@/components/mode-toggle"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Search } from "lucide-react"

export default function DesignSystemPage() {
  return (
    <div className="container mx-auto py-10 space-y-12">
      <div className="flex items-center justify-between border-b pb-6">
        <div>
          <h1 className="text-4xl font-bold">디자인 시스템</h1>
          <p className="text-muted-foreground mt-2">ProbeAI의 핵심 컴포넌트 및 토큰.</p>
        </div>
        <ModeToggle />
      </div>
      
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">테마 색상</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="space-y-2">
                <div className="h-20 rounded-md bg-background border border-border shadow-sm"></div>
                <p className="text-xs font-medium">Background</p>
            </div>
            <div className="space-y-2">
                <div className="h-20 rounded-md bg-primary text-primary-foreground flex items-center justify-center text-xs">Primary</div>
                <p className="text-xs font-medium">Primary</p>
            </div>
            <div className="space-y-2">
                <div className="h-20 rounded-md bg-secondary text-secondary-foreground flex items-center justify-center text-xs">Secondary</div>
                <p className="text-xs font-medium">Secondary</p>
            </div>
            <div className="space-y-2">
                <div className="h-20 rounded-md bg-muted text-muted-foreground flex items-center justify-center text-xs">Muted</div>
                <p className="text-xs font-medium">Muted</p>
            </div>
            <div className="space-y-2">
                <div className="h-20 rounded-md bg-destructive text-destructive-foreground flex items-center justify-center text-xs">Destructive</div>
                <p className="text-xs font-medium">Destructive</p>
            </div>
            <div className="space-y-2">
                <div className="h-20 rounded-md bg-card text-card-foreground border border-border flex items-center justify-center text-xs">Card</div>
                <p className="text-xs font-medium">Card</p>
            </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">버튼 (Buttons)</h2>
        <div className="flex flex-wrap gap-4">
          <Button>기본 (Default)</Button>
          <Button variant="secondary">보조 (Secondary)</Button>
          <Button variant="outline">외곽선 (Outline)</Button>
          <Button variant="destructive">경고 (Destructive)</Button>
          <Button variant="ghost">고스트 (Ghost)</Button>
          <Button variant="link">링크 (Link)</Button>
        </div>
        <div className="flex flex-wrap items-center gap-4 mt-4">
          <Button size="sm">작게 (Small)</Button>
          <Button size="default">기본 (Default)</Button>
          <Button size="lg">크게 (Large)</Button>
          <Button size="icon"><Search className="h-4 w-4" /></Button>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">입력 필드 (Inputs)</h2>
          <div className="space-y-4 max-w-md">
            <div className="space-y-2">
              <label className="text-sm font-medium">기본 입력</label>
              <Input placeholder="입력하세요..." />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">아이콘이 있는 입력</label>
              <Input placeholder="검색..." startIcon={<Search className="h-4 w-4" />} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">에러 상태</label>
              <Input placeholder="잘못된 값" error />
              <p className="text-xs text-destructive">이 필드는 필수입니다.</p>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">컨테이너 (Containers)</h2>
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>예시 카드</CardTitle>
                <CardDescription>카드 컴포넌트에 대한 설명입니다.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">카드는 콘텐츠를 담는 유연한 컨테이너입니다. 헤더, 푸터 및 다양한 유형의 콘텐츠를 포함할 수 있습니다.</p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">취소</Button>
                <Button>제출</Button>
              </CardFooter>
            </Card>

            <div className="p-4 border border-dashed border-border rounded-lg flex items-center justify-center">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">모달 대화상자 열기</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>모달 대화상자</DialogTitle>
                    <DialogDescription>
                      이 대화상자는 포커스 트랩 및 스크린 리더 지원을 포함하여 완전한 접근성을 위해 Radix UI 프리미티브를 사용합니다.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="py-4">
                    <p className="text-sm">대화상자 내용이 여기에 들어갑니다. 양식이나 다른 컴포넌트를 포함하여 무엇이든 넣을 수 있습니다.</p>
                  </div>
                  <DialogFooter>
                    <Button type="submit">확인</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
